d = {
    'a': 1, 
    'b': 2, 
    'c': 3
}
# 取key
for k in d:
    print(k)

# 取value
for k in d.values():
    print(k)

# 或者
for k in d:
    print(d[k])

# 取key和value
for k, v in d.items():
    print(k, v)

# 判断是不是可迭代对象
from collections import Iterable
print(isinstance('abc', Iterable))

# 取下标
for i, v in enumerate(['a', 'b', 'c']):
    print(i, v)

