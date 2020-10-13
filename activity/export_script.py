import io
import os
import pathlib
import webbrowser

from bs4 import BeautifulSoup


CWD = pathlib.Path(__file__).parent.absolute()
# INPUT
BUILD_DIR = CWD / 'build'
BUILD_FNAME = 'index.html'
# OUTPUT
EXPORT_DIR = CWD / 'export'
EXPORT_FNAME = 'activity.html'


def open_file(filename, mode='r'):
    os.makedirs(os.path.dirname(filename), exist_ok=True)
    return io.open(filename, mode=mode, encoding='utf-8')


def get_file_contents(src, ftype):
    assert src
    assert src.endswith(f'.{ftype}')
    assert '://' not in src
    src_abs = BUILD_DIR / src
    assert src_abs.exists()
    print(f'Trying to open {src_abs}')
    with open_file(src_abs) as f:
        return f.read()


def embed_docs(soup):
    # Embed scripts
    scripts = soup.find_all('script')
    for script in scripts:
        src = script.get('src')
        try: contents = get_file_contents(src, 'js')
        except AssertionError: continue
        del script['src']
        script.string = contents
    # Embed styles
    links = soup.find_all('link')
    for link in links:
        href = link.get('href')
        try: contents = get_file_contents(href, 'css')
        except AssertionError: continue
        link.attrs = {}
        link.name = 'style'
        link.string = contents


def main():
    print('Exporting build...')
    path = BUILD_DIR / BUILD_FNAME
    if not path.exists():
        raise IOError('Build not found')
    contents = ''
    with open_file(path) as f:
        contents = f.read()
    soup = BeautifulSoup(contents, 'html.parser')
    embed_docs(soup)
    with open_file(EXPORT_DIR / EXPORT_FNAME, 'w') as f:
        f.write(str(soup))
        print('\nExport successful')
        webbrowser.open_new_tab(EXPORT_DIR / EXPORT_FNAME)


if __name__ == '__main__':
    main()
