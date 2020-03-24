import re
import os
from os import path


TABSIZE = 4
main_file = "index.html"


def up(n, nth_dir=os.getcwd()):
    while n > 0:
        nth_dir = os.path.dirname(nth_dir)
        n -= 1
    return nth_dir


def create_dir(dir_name):
    print "Trying to create an exports directory"
    print " -",
    if not os.path.exists(dir_name):
        os.mkdir(dir_name)
        print "Directory", dir_name, "Created"
    else:
        print "Directory", dir_name, "already exists"
    print


def get_dst_export_main_file(dir_name):
    # get the path to the file in the current directory
    src = path.realpath(main_file)
    # separate the path from the filter
    head, tail = os.path.split(src)
    print("Current Path: " + head)
    print("Main File: " + tail)
    dst = path.join(dir_name, tail)
    # now use the shell to make a copy of the file
    print "File will export to index.html in exports"
    print " -", dst
    print
    return dst


def get_project_files():
    file_types = [".css", ".js"]

    project_files = []
    entries = os.listdir(os.getcwd())

    print "Project files:"
    for entry in entries:
        if entry == os.path.basename(__file__) and entry != "index.html":
            continue

        if entry[0].isalnum() and any(map(entry.endswith, file_types)):
            print " -", entry
            project_files.append(entry)
    print

    return project_files


def merge_files_to_export(export_file_path):
    re_js = re.compile(r"(<.*src=\".*\.js\".*>)")
    re_css = re.compile(r"(<.*href=\".*\.css\".*>)")
    re_link = re.compile(r"(src=\"((https:)|(http:)).*\.js\")")
    output = []
    print "Main File: index.html"
    with open(main_file, 'r') as read_obj, open(export_file_path, 'w') as write_obj:
        for i, line in enumerate(read_obj):
            if line[-1] == '\n':
                line = line[:-1]

            # Pretty print the main file
            print str(i + 1).rjust(3), line

            match_js = re_js.findall(line)
            match_css = re_css.findall(line)

            line_match = match_js + match_css
            line_match = filter(lambda j: not bool(re_link.search(j)), line_match)
            # If we didn't find any reference to other files
            # then we simply write the line as is, and continue to the next line.
            if not line_match:
                write_obj.write(line + "\n")
                continue

            line_match = line_match[0]
            file_name = re.findall(r"[^\"]*\.js", line_match) + re.findall(r"[^\"]*\.css", line_match)
            file_name = file_name[0]

            output.append("File detected: " + line_match + " File name: " + file_name)

            # Try to open the project file and copy it's content.
            try:
                with open(os.path.join(os.getcwd(), file_name), "r") as project_file:
                    output.append("Success " + file_name + "\n")
                    file_content = project_file.readlines()
            except Exception as e:
                output.append("Failed to open " + file_name + "\n")
                continue  # TODO remove this line for safety reasons.
                raise e

            # Set the right tag for .js files and for .css files
            tag_start = " " * line.index("<")
            tag_end = " " * line.index("<")
            if file_name.endswith(".js"):
                tag_start += "<script>\n"
                tag_end += "</script>\n"
            else:
                tag_start += "<style>\n"
                tag_end += "</style>\n"

            # Add the tag before and after the content
            file_content = [" " * (line.index("<") + TABSIZE) + l for l in file_content]
            file_content.insert(0, tag_start)
            file_content.append(tag_end)

            # Write to the file the content
            try:
                write_obj.write("".join(file_content))
            except Exception as e:
                print e
    return output


def main():
    dir_path = os.getcwd()
    dir_path = up(1, dir_path)

    dir_name = path.join(dir_path, "exports")
    # Creates the exports dir one dir up from this current dir
    create_dir(dir_name)

    """
    # TODO maybe change the duplicated copy name
    # simply change the string that is passed to export_file_path
    name = "iFigures"
    version = 1
    """
    # copy the main index.html file
    # duplicate and move the file to the exports folder
    export_file_path = get_dst_export_main_file(dir_name)

    # Merge the files to the main index.html file
    project_files = get_project_files()

    # Merging
    output = merge_files_to_export(export_file_path)

    # Final debug
    print "\n\nMerge Output Debug:"
    for x in output:
        print "\t" + x


if __name__ == "__main__":
    if os.path.isfile(main_file):
        main()

        print "\nMerge finished\n"
    else:
        print "Error there is no index.html found"
