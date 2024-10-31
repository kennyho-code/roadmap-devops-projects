#!/bin/bash

# Exit on any error
set -e

# Log all output
exec 1> >(logger -s -t $(basename $0)) 2>&1

echo "Starting Netdata installation..."

# Update system
apt-get update
apt-get upgrade -y

# Install required packages
apt-get install -y curl wget

# Install Netdata using the official one-line installation script
wget -O /tmp/netdata-kickstart.sh https://my-netdata.io/kickstart.sh
sh /tmp/netdata-kickstart.sh --non-interactive
