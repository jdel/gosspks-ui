#!/bin/sh
confd -onetime -backend env
nginx -g "daemon off;"