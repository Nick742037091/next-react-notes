import { EventEmitter } from 'events'
// 通过eventBus实现客户端组件之间的事件通知机制
const eventBus = new EventEmitter()
export default eventBus
