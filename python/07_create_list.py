list1 = list(range(1, 11))
print(list1)

# 在list中创建
list2 = [ x * x for x in range(1, 11)]
print(list2)

# 当前目录下所有文件和目录
import os
list3 = [ d for d in os.listdir('.')]
print(list3)

# 加入处理方法和判断
list4 = ['aa', 'BB', 11, 'cc']
list5 = [i.lower() for i in list4 if isinstance(i, str)]
print(list5)