"""Buat paket statis bersih tanpa dokumentasi, tes, atau data pribadi."""
from pathlib import Path
from zipfile import ZipFile, ZIP_DEFLATED

root = Path(__file__).resolve().parent.parent
output = root / 'artifacts' / 'iris-bakery.zip'
output.parent.mkdir(exist_ok=True)
files = [root / 'index.html']
for directory in ('css', 'js', 'assets/images'):
    files.extend(path for path in (root / directory).rglob('*')
                 if path.is_file() and path.suffix in ('.css', '.js', '.svg', '.webp', '.avif', '.png', '.jpg'))
with ZipFile(output, 'w', ZIP_DEFLATED) as archive:
    for path in sorted(files):
        archive.write(path, path.relative_to(root))
print(f'Paket statis: {output.relative_to(root)} ({len(files)} berkas)')
