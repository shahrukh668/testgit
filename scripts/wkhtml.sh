#!/bin/bash

case "`uname -m`" in

x86_64) 
	wget "https://downloads.sourceforge.net/project/voipmonitor/wkhtml/0.11.0_rc1/wkhtmltoimage-amd64?r=&ts=1353445419&use_mirror=switch" -O ../bin/wkhtmltoimage-x86_64
	chmod +x ../bin/wkhtmltoimage-x86_64
	wget "https://downloads.sourceforge.net/project/voipmonitor/wkhtml/0.11.0_rc1/wkhtmltopdf-amd64?r=&ts=1353445419&use_mirror=switch" -O ../bin/wkhtmltopdf-x86_64
	chmod +x ../bin/wkhtmltopdf-x86_64
	;;
i686)
	wget "https://downloads.sourceforge.net/project/voipmonitor/wkhtml/0.11.0_rc1/wkhtmltoimage-i386?r=&ts=1353445419&use_mirror=switch" -O ../bin/wkhtmltoimage-i686
	chmod +x ../bin/wkhtmltoimage-i686
	wget "https://downloads.sourceforge.net/project/voipmonitor/wkhtml/0.11.0_rc1/wkhtmltopdf-i386?r=&ts=1353445419&use_mirror=switch" -O ../bin/wkhtmltopdf-i686
	chmod +x ../bin/wkhtmltopdf-i686
	;;
esac

