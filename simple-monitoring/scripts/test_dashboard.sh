!#/bin/bash
# Enable and start Netdata service
systemctl enable netdata
systemctl start netdata

# Allow Netdata through firewall
ufw allow 19999/tcp
