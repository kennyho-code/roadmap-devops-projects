!#/bin/bash

systemctl stop netdata
systemctl disable netdata
ufw delete allow 19999/tcp
systemctl daemon-reload
