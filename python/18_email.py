#!/usr/bin/python3
#-*-coding:UTF-8-*-

from email import encoders
from email.header import Header
from email.mime.text import MIMEText
from email.utils import parseaddr, formataddr
import smtplib


def _format_addr(s):
    name, addr = parseaddr(s)
    return formataddr((Header(name, 'utf-8').encode(), addr))


# 输入发送账户信息
formAddr = 'zhouyouus@126.com'
password = 'perfectyou421'

# 输入收件人地址
toAddr = 'zhouyou421@126.com'
smtpServer = 'smtp.126.com'
# toAddr = '17989956@qq.com'
# smtpServer = 'smtp.qq.com'

msg = MIMEText('hello, send by python', 'plain', 'utf-8')
msg['From'] = _format_addr('py author <%s>' % formAddr)
msg['To'] = _format_addr('citrus <%s>' % toAddr)
msg['Subject'] = Header('来处SMTP的问候', 'utf-8').encode()

server = smtplib.SMTP_SSL(smtpServer, 465)
server.set_debuglevel(1)
server.login(formAddr, password)
server.sendmail(formAddr, [toAddr], msg.as_string())
server.quit()