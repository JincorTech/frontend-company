/**
 * Types
 */
import { StateObj, ActivityMap, ActivityNode } from '../../redux/modules/profile/activityTypes'

export type ActivityType = {
  id: string
  name: string
  code: string
  children?: ActivityType[]
}

/**
 * Normalize activities types
 */
export function normalizeActivities(activities: ActivityType[]): StateObj {
  return {
    rootNodes: activities.map((activity) => activity.id),
    activityMap: traverseNodes(activities, null, {})
  }
}

/**
 * traverse activity tree recursively
 */
export function traverseNodes(activities: ActivityType[], parentId: string, hash: ActivityMap): ActivityMap {
  return activities.reduce((acc, activity) => {
    const { id, children } = activity

    return children
      ? traverseNodes(children, id, addNode(activity, parentId, hash))
      : addLeaf(activity, parentId, hash)
  }, hash)
}

/**
 * Add node to ActivityMap
 */
export function addNode(activity: ActivityType, parentId: string, hash: ActivityMap): ActivityMap {
  const { id, name, children } = activity

  hash[id] = {
    type: 'node',
    id,
    name,
    open: false,
    visible: true,
    parentId: parentId,
    childrenIds: activity.children.map((child) => child.id)
  }

  return hash
}

/**
 * Add leaf to ActivityMap
 */
export function addLeaf(activity: ActivityType, parentId: string, hash: ActivityMap): ActivityMap {
  const { id, name } = activity

  hash[id] = {
    type: 'leaf',
    id,
    name,
    selected: false,
    visible: true,
    parentId
  }

  return hash
}


/**
 * Close activity node and show siblings
 */
export function closeNodeSelector(activityId: string, state: StateObj): ActivityMap {
  const { activityMap, rootNodes } = state
  const { parentId } = activityMap[activityId]

  const childrenIds = parentId
    ? (<ActivityNode>activityMap[parentId]).childrenIds
    : rootNodes

  return childrenIds.reduce((acc, childId) => {
    acc[childId] = {
      ...activityMap[childId],
      open: false,
      visible: true
    }

    return acc
  }, {})
}

/**
 * Open activity node and hide siblings
 */
export function openNodeSelector(activityId: string, state: StateObj): ActivityMap {
  const { activityMap, rootNodes } = state
  const { parentId } = activityMap[activityId]

  const childrenIds = parentId
    ? (<ActivityNode>activityMap[parentId]).childrenIds
    : rootNodes

  return childrenIds.reduce((acc, childId) => {
    acc[childId] = {
      ...activityMap[childId],
      open: childId === activityId,
      visible: childId === activityId
    }

    return acc
  }, {})
}