import React from 'react'
import ReactDOM from 'react-dom'

// 函数组件不能使用ref属性,因为函数组件没有实例(没有实例什么意思)

// 使用React.forwardRed()解决

const Input1 = ref => {
  return <input type="text" ref={ref} />
}

const TextInput = React.forwardRef((props, ref) => {
  return <input type="text" ref={ref} />
})

const TextInput2 = React.forwardRef((props, ref) => Input1(ref))

class App extends React.Component {
  render() {
    return (
      <div>
        这是App组件
        <TextInput ref={v => console.log(v)} />
        <TextInput2 ref={v => console.log(v)} />
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))
