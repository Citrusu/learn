#返回最大值
def max(num1, num2):
    if num1 > num2:
        return num1
    else:
        return num2

# print(max(15, 8))

#空函数，什么都不做
def nullfunc():
    pass

#默认参数
def power(x, n = 2):
    s = 1
    while n > 0:
        n -= 1
        s *= x
    return s

# print(power(5))

# 可变参数
nums = [2, 3, 4]
# 传入 *params 会自动把多个参数组装成一个list或tuple
def getSum(*params):
    sum = 0
    for n in params:
        sum += n
    return sum
# print(getSum(1, 2, 3, 4))
# print(getSum(*nums))  # 使用 *nums 调用会把list或tuple拆成可变参数传入

# 关键字参数
extra = {
    'love': 'zlh',
    'like': 'read'
}
# 传入 **kw 
def getPersion(name, age, **kw):
    print(name,age,  kw)

# getPersion('zy', 18, love = 'zlh', like = 'read')
getPersion('zy', 20, **extra)

# 关键字参数与可变参数不同的是传入类型是dict