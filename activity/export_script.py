from bs4 import BeautifulSoup

import pathlib
import io
import webbrowser


CWD = pathlib.Path(__file__).parent.absolute()
# INPUT
BUILD_DIR = CWD / 'build'
BUILD_FNAME = 'index.html'
# OUTPUT
EXPORT_DIR = CWD / 'export'
EXPORT_FNAME = 'activity.html'


def embed_docs(soup):
    scripts = soup.find_all('script')
    for script in scripts:
        src = script.get('src')
        if not src:
            continue
        if '://' in src:
            continue
        src_abs = BUILD_DIR / src
        if not src_abs.exists():
            continue
        with io.open(src_abs, mode='r', encoding='utf-8') as f:
            contents = f.read()
        del script['src']
        script.string = contents


def main():
    print('Exporting build...')
    path = BUILD_DIR / BUILD_FNAME
    if not path.exists():
        raise IOError('Build not found')
    contents = ''
    with io.open(path, mode='r', encoding='utf-8') as f:
        contents = f.read()
    soup = BeautifulSoup(contents, 'html.parser')
    embed_docs(soup)
    with io.open(EXPORT_DIR / EXPORT_FNAME, mode='w', encoding='utf-8') as f:
        f.write(str(soup))
        print('\nExport successful')
        webbrowser.open_new_tab(EXPORT_DIR / EXPORT_FNAME)


if __name__ == '__main__':
    main()
