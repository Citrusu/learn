package main
var a int = 1
var b string = "bb"
var c = 1.1
var d bool = false
var e, f, g int = 3, 4, 5 //并行赋值

func vars(){
	e := "ee" //初始声明，类型自动推断，函数内
	h, j, k := true, true, false
	j,k = k,j //交换值，函数内
	println(a,b,c,d,e,f,g,h,j,k)
}