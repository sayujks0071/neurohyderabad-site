#!/usr/bin/env python3
"""
Fix YAML formatting issues in GitHub workflow files:
1. Remove merge conflict markers
2. Fix duplicate/malformed setup-node blocks
3. Standardize pnpm commands to use 'pnpm run'
"""

import re
import sys
from pathlib import Path

def fix_merge_conflicts(content):
    """Remove merge conflict markers and keep the 'Stashed changes' version."""
    # Pattern for merge conflicts: keep the content between ======= and >>>>>>>
    pattern = r'<<<<<<< Updated upstream\n.*?\n=======\n(.*?)\n>>>>>>> Stashed changes'
    content = re.sub(pattern, r'\1', content, flags=re.DOTALL)
    return content

def fix_setup_node_blocks(content):
    """Fix duplicate/malformed setup-node blocks."""
    # Pattern 1: Duplicate setup-node with pnpm/action-setup incorrectly used
    pattern1 = r'- name: Setup Node\.js\s+uses: pnpm/action-setup@v4\s+with:\s+version: 9\s+- name: Setup Node\.js\s+uses: actions/setup-node@v4'
    replacement1 = '- name: Setup Node.js\n        uses: actions/setup-node@v4'
    content = re.sub(pattern1, replacement1, content)
    
    # Pattern 2: Fix missing cache line after setup-node
    # Look for setup-node blocks that might be missing cache
    lines = content.split('\n')
    fixed_lines = []
    i = 0
    while i < len(lines):
        line = lines[i]
        fixed_lines.append(line)
        
        # If we see a setup-node block, ensure it has cache
        if 'uses: actions/setup-node@v4' in line:
            # Look ahead to see if cache is missing
            j = i + 1
            has_cache = False
            while j < len(lines) and (lines[j].strip().startswith('with:') or lines[j].strip().startswith('node-version:') or lines[j].strip().startswith('cache:')):
                if 'cache:' in lines[j]:
                    has_cache = True
                j += 1
            
            # If no cache found and we have node-version, add cache
            if not has_cache and j < len(lines) and 'node-version:' in '\n'.join(lines[i+1:j+3]):
                # Find where to insert cache
                k = i + 1
                while k < len(lines) and (lines[k].strip().startswith('with:') or lines[k].strip().startswith('node-version:')):
                    k += 1
                # Insert cache before closing the with block
                if k < len(lines) and not lines[k].strip().startswith('cache:'):
                    fixed_lines.insert(k, "          cache: 'pnpm'")
        
        i += 1
    
    return '\n'.join(fixed_lines)

def standardize_pnpm_commands(content):
    """Standardize pnpm commands to use 'pnpm run' for scripts."""
    # Commands that should use 'pnpm run'
    script_commands = ['build', 'start', 'check:sitemap', 'check:schemas', 'check:lighthouse']
    
    for cmd in script_commands:
        # Pattern: run: pnpm <command> (without 'run')
        pattern = rf'run: pnpm {re.escape(cmd)}(?!\s+run)'
        replacement = f'run: pnpm run {cmd}'
        content = re.sub(pattern, replacement, content)
        
        # Also fix in multi-line run blocks
        pattern = rf'pnpm {re.escape(cmd)}(?!\s+run)'
        replacement = f'pnpm run {cmd}'
        content = re.sub(pattern, replacement, content)
    
    # Fix pnpm install -g to pnpm add -g (more correct for pnpm)
    content = re.sub(r'pnpm install -g', 'pnpm add -g', content)
    
    return content

def fix_workflow_file(file_path):
    """Fix a single workflow file."""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        original = content
        
        # Apply fixes
        content = fix_merge_conflicts(content)
        content = fix_setup_node_blocks(content)
        content = standardize_pnpm_commands(content)
        
        # Only write if changed
        if content != original:
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f"✅ Fixed: {file_path}")
            return True
        else:
            print(f"⏭️  No changes: {file_path}")
            return False
    except Exception as e:
        print(f"❌ Error fixing {file_path}: {e}", file=sys.stderr)
        return False

def main():
    """Main function to fix all workflow files."""
    workflows_dir = Path('.github/workflows')
    
    if not workflows_dir.exists():
        print(f"❌ Directory {workflows_dir} does not exist")
        sys.exit(1)
    
    workflow_files = list(workflows_dir.glob('*.yml')) + list(workflows_dir.glob('*.yaml'))
    
    if not workflow_files:
        print("⚠️  No workflow files found")
        return
    
    print(f"🔧 Fixing {len(workflow_files)} workflow file(s)...\n")
    
    fixed_count = 0
    for wf_file in sorted(workflow_files):
        if fix_workflow_file(wf_file):
            fixed_count += 1
    
    print(f"\n✨ Fixed {fixed_count} of {len(workflow_files)} file(s)")

if __name__ == '__main__':
    main()

