import 'zone.js'
import 'zone.js/dist/long-stack-trace-zone'
import {getUniqueId, asPromise} from './helpers'

const TASK_CANCELLED = 'TaskCancelled'

class TaskCancelled extends Error {
  constructor (message) {
    super(message)
    this.name = TASK_CANCELLED
  }
}

export const activeThreads = new Map()
export const getThread = name => activeThreads.get(name)
export const hasThread = name => activeThreads.has(name)

export const getContext = () => {
  let zone = Zone.current
  const context = []
  while (zone) {
    context.push(zone.name)
    zone = zone.parent
  }
  return context
}

export const sync = () => {
  let zone = Zone.current
  while (zone) {
    if (
      zone.name === '<root>' ||
      zone.name === Zone.longStackTraceZoneSpec.name
    ) {
      return
    }
    if (!activeThreads.has(zone.name)) {
      let errorText
      if (zone.name === Zone.current.name) {
        errorText = `${Zone.current.name} was manually cancelled`
      } else {
        errorText =
          `${Zone.current.name} cancelled because parent zone ` +
          `${zone.name} was cancelled`
      }
      throw new TaskCancelled(errorText)
    }
    zone = zone.parent
  }
}

export const cancel = name => {
  console.log(`cancel ${name}`)
  activeThreads.delete(name)
}

class ChildZoneSpec {
  constructor (name, properties, done) {
    this.name = name
    this.done = done
    this.flushed = false
    this.properties = properties
    this.tasks = 0
    this.started = false
  }

  onScheduleTask (parent, current, target, task) {
    if (task.type === 'microTask' || task.type === 'macroTask') {
      this.started = true
      this.tasks += 1
    }
    parent.scheduleTask(target, task)
  }

  onInvokeTask (parent, current, target, task, applyThis, applyArgs) {
    if (task.type === 'microTask' || task.type === 'macroTask') {
      this.tasks -= 1
    }
    parent.invokeTask(target, task, applyThis, applyArgs)
  }

  onHasTask (parent, current, target, hasTaskState) {
    if (
      !hasTaskState.microTask &&
      !hasTaskState.macroTask &&
      this.started &&
      this.tasks === 0 &&
      !this.flushed
    ) {
      this.flushed = true
      this.done()
    }
  }
}

const ErrorHandlingZoneSpec = {
  name: 'ErrorHandlingZone',
  onHandleError: (parent, current, target, error) => {
    console.log(error.stack)
  }
}

// creates a task which may be run by spawn
export const createTask = (syncTask, fn, ...args) => {
  const task = asPromise(fn, ...args)
  if (!syncTask) {
    return task
  }

  return async () => {
    const result = await task()
    sync()
    return result
  }
}

export const spawn = (name, props, parentZone, task, done) => {
  console.log(`spawn ${name} in ${parentZone.name}`)
  if (activeThreads.has(name)) {
    throw new Error(`Duplicate thread name '${name}'`)
  }

  // called when all tasks in zone are completed
  const cancelOnDone = () => cancel(name)
  const onDone = done || cancelOnDone

  // setup new zone
  const zoneSpec = new ChildZoneSpec(name, props, onDone)
  let zone = parentZone
  if (zone.name === '<root>' && __DEV__) {
    // in root zone, fork long stack trace zone
    zone = zone.fork(ErrorHandlingZoneSpec).fork(Zone.longStackTraceZoneSpec)
  }

  // register and run thread
  const forkedZone = zone.fork(zoneSpec)
  activeThreads.set(name, forkedZone)
  const thread = forkedZone.run(task)
  thread.cancel = () => cancel(name)
  return thread
}

export const run = task => Zone.current.run

// Fork with given thread name and handle `CANCELLED` exceptions.
export const forkNamed = async (name, props, fn, ...args) => {
  const task = createTask(false, fn, ...args)
  const thread = spawn(name, props, Zone.current, task)
  thread.catch(e => {
    if (e.name !== TASK_CANCELLED) {
      throw e
    }
  })
  await thread
  console.log('fork done')
}

// fork and return task ID
export const fork = (props, fn, ...args) => {
  const id = getUniqueId('fork')
  forkNamed(id, props, fn, ...args)
  return id
}

// fork and return result
export const call = async (props, fn, ...args) => {
  const task = createTask(true, fn, ...args)
  const result = await spawn(getUniqueId('call'), props, Zone.current, task)
  return result
}
