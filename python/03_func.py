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
def getSum(*params):
    sum = 0
    for n in params:
        sum += n
    return sum
# print(getSum(1, 2, 3, 4))
# print(getSum(*nums))
