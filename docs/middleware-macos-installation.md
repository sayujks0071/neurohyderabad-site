# Middleware Agent Installation for macOS

## Overview

Middleware Agent collects and analyzes infrastructure data on macOS systems. This guide covers installation on macOS (Ventura 13+).

## Prerequisites

- **macOS Version**: 13 (Ventura) or above
- **Hardware**: Apple Silicon (M1/M2/M3) or Intel Architecture
- **Administrator access**: Required for installation

## Installation

### Quick Install (Bash)

Run the following command to automatically install the Middleware Agent:

```bash
MW_API_KEY="fygjftkluglwjxlwyhqdwshcbwtvfavastli" \
MW_TARGET="https://hjptv.middleware.io" \
bash -c "$(curl -L https://install.middleware.io/scripts/mw-macos-agent-install.sh)"
```

**What this does:**
- Automatically detects your macOS architecture (Apple Silicon or Intel)
- Downloads and installs the appropriate MW Agent
- Configures the agent with your API key and target
- Sets up the agent as a launchd service

### Configuration Details

- **API Key**: `fygjftkluglwjxlwyhqdwshcbwtvfavastli`
- **Target**: `https://hjptv.middleware.io`
- **Service Name**: `io.middleware.mw-agent`

## Verification

### Check Agent Status

After installation, verify the agent is running:

```bash
sudo launchctl list | grep mw-agent
```

**Expected Output:**
```
33105	0	io.middleware.mw-agent
```

The output shows:
- **PID** (Process ID): `33105` - The running process ID
- **Exit Code**: `0` - Success (0 = running, non-zero = error)
- **Service Name**: `io.middleware.mw-agent`

### Check Agent Logs

View agent logs to verify it's working correctly:

```bash
# View recent logs
log show --predicate 'process == "mw-agent"' --last 5m

# Or check system logs
sudo log show --predicate 'subsystem == "io.middleware.mw-agent"' --last 1h
```

## Manual Installation Steps

If you prefer to install manually:

1. **Download the installation script:**
   ```bash
   curl -L https://install.middleware.io/scripts/mw-macos-agent-install.sh -o /tmp/mw-install.sh
   ```

2. **Set environment variables:**
   ```bash
   export MW_API_KEY="fygjftkluglwjxlwyhqdwshcbwtvfavastli"
   export MW_TARGET="https://hjptv.middleware.io"
   ```

3. **Run the installation script:**
   ```bash
   bash /tmp/mw-install.sh
   ```

4. **Verify installation:**
   ```bash
   sudo launchctl list | grep mw-agent
   ```

## Management

### Start Agent
```bash
sudo launchctl start io.middleware.mw-agent
```

### Stop Agent
```bash
sudo launchctl stop io.middleware.mw-agent
```

### Restart Agent
```bash
sudo launchctl stop io.middleware.mw-agent
sudo launchctl start io.middleware.mw-agent
```

### Check Agent Configuration
```bash
# View launchd plist
sudo cat /Library/LaunchDaemons/io.middleware.mw-agent.plist
```

## Uninstallation

To remove the Middleware Agent:

```bash
# Stop the agent
sudo launchctl stop io.middleware.mw-agent
sudo launchctl unload /Library/LaunchDaemons/io.middleware.mw-agent.plist

# Remove files
sudo rm /Library/LaunchDaemons/io.middleware.mw-agent.plist
sudo rm -rf /usr/local/bin/mw-agent
sudo rm -rf /var/lib/mw-agent
```

## Troubleshooting

### Agent Not Running

If the agent is not running:

1. **Check if service is loaded:**
   ```bash
   sudo launchctl list | grep mw-agent
   ```

2. **Check logs for errors:**
   ```bash
   log show --predicate 'process == "mw-agent"' --last 1h | grep -i error
   ```

3. **Verify API key and target:**
   ```bash
   sudo cat /Library/LaunchDaemons/io.middleware.mw-agent.plist | grep -E "MW_API_KEY|MW_TARGET"
   ```

4. **Check network connectivity:**
   ```bash
   curl -v https://hjptv.middleware.io
   ```

### Permission Issues

If you encounter permission errors:

```bash
# Ensure you have sudo access
sudo -v

# Check file permissions
ls -la /Library/LaunchDaemons/io.middleware.mw-agent.plist
ls -la /usr/local/bin/mw-agent
```

### Architecture Detection Issues

The installation script should automatically detect your architecture. If you need to manually specify:

- **Apple Silicon**: The script will install the ARM64 version
- **Intel**: The script will install the x86_64 version

## Security Considerations

⚠️ **Important Security Notes:**

1. **API Key Protection**: The API key is sensitive. Consider:
   - Storing in a secure location
   - Using environment variables in a secure way
   - Rotating keys regularly

2. **Network Security**: The agent communicates with:
   - `https://hjptv.middleware.io` (HTTPS encrypted)

3. **System Permissions**: The agent requires:
   - Administrator privileges for installation
   - System-level access for monitoring

## References

- [Middleware macOS Documentation](https://docs.middleware.io/)
- [macOS LaunchDaemon Documentation](https://developer.apple.com/library/archive/documentation/MacOSX/Conceptual/BPSystemStartup/Chapters/CreatingLaunchdJobs.html)

## Related Documentation

- [Kubernetes Helm Setup](./kubernetes-helm-setup.md) - For Kubernetes cluster installation

## Last Updated
January 26, 2026
