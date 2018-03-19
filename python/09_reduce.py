from functools import reduce
l = [1,2,3,4]
def fn(x, y):
    print(x,y)
    return x * y
p = reduce(fn, l)
print(p)