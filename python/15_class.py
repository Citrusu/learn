class Persion(object):
    def __init__(self, name, age):
        self.name = name
        self.age = age

    def say(self):
        print('%s, %s' % (self.name, self.age))

aa = Persion('zy', 18)
bb = Persion('zlh', 17)

aa.say()
bb.say()