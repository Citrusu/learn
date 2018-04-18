# 继承
class Animal():
    def pri(self):
        print('this is animal')

# dog = Animal()
# dog.pri()

class Dog(Animal):
    pass

dog1 = Dog()
dog1.pri()

# 多态
class Cat(Animal):
    def conls(self):
        print('conls')

cat = Cat()
cat.pri()
cat.conls()