#!/bin/bash

echo "Total CPU Usage:"
mpstat 1 1 | awk '/Average/ {print 100 - $12 "% used"}'
echo ""

# Total Memory Usage
echo "Total Memory Usage:"
free -h | awk 'NR==2{printf "Used: %s\nFree: %s\nTotal: %s\nPercentage Used: %.2f%%\n", $3, $4, $2, $3*100/$2}'
echo ""

# Total Disk Usage
echo "Total Disk Usage:"
df -h --total | awk 'END{printf "Used: %s\nFree: %s\nTotal: %s\nPercentage Used: %s\n", $3, $4, $2, $5}'
echo ""

# Top 5 Processes by CPU Usage
echo "Top 5 Processes by CPU Usage:"
ps -eo pid,ppid,cmd,%cpu --sort=-%cpu | head -n 6
echo ""

# Top 5 Processes by Memory Usage
echo "Top 5 Processes by Memory Usage:"
ps -eo pid,ppid,cmd,%mem --sort=-%mem | head -n 6
