# -*- mode: python ; coding: utf-8 -*-
import os
import subprocess

from PyInstaller.utils.hooks import collect_dynamic_libs
from PyInstaller.utils.hooks import collect_data_files
from PyInstaller.utils.hooks import copy_metadata

### target triple aquirement
try:
    rustc_output = subprocess.check_output(['rustc', '-vV'], text=True)
    target_triple = next(line.split(': ')[1] for line in rustc_output.splitlines() if line.startswith('host'))
except Exception as e:
    raise RuntimeError("Failed to determine target triple") from e

output_name = f"taupy-pyserver-{target_triple}"

### collect python
datas = []
binaries = []
hiddenimports = []

block_cipher = None

a = Analysis(
    ['pyserver/main.py'],
    pathex=[],
    binaries=binaries,
    datas=datas,
    hiddenimports=hiddenimports,
    hookspath=[],
    hooksconfig={},
    runtime_hooks=[],
    excludes=[],
    win_no_prefer_redirects=False,
    win_private_assemblies=False,
    cipher=block_cipher,
    noarchive=False,
)
pyz = PYZ(a.pure, a.zipped_data, cipher=block_cipher)

exe = EXE(
    pyz,
    a.scripts,
    a.binaries,
    a.zipfiles,
    a.datas,
    [],
    name=output_name,
    debug=False,
    bootloader_ignore_signals=False,
    strip=False,
    upx=True,
    upx_exclude=[],
    runtime_hooks=[],
    console=True,
    disable_windowed_traceback=False,
    argv_emulation=False,
    target_arch=None,
    codesign_identity=None,
    entitlements_file=None,
)