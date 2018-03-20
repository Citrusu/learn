def sayName(name):
    print(name)

say = sayName
# print(say.__name__)

def log(func):
    def wrapper(*args, **kw):
        print('call %s():' % func.__name__)
        return func(*args, **kw)
    return wrapper

@log     #在 now 前面加@log 相当于 log(now)
def now():
    print('2018')

now()