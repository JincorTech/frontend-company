/**
 * Types
 */
import { ActivityMap, ActivityNode, StateMap, NormalizedActivities } from '../../redux/modules/common/activityTypes';

export type ActivityType = {
  id: string
  name: string
  code: string
  children?: ActivityType[]
};

/**
 * Normalize activities types
 */
export function normalizeActivities(activities: ActivityType[]): NormalizedActivities {
  return {
    rootNodes: activities.map((activity) => activity.id),
    activityMap: traverseNodes(activities, null, {})
  };
}

/**
 * traverse activity tree recursively
 */
export function traverseNodes(activities: ActivityType[], parentId: string, hash: ActivityMap): ActivityMap {
  return activities.reduce((acc, activity) => {
    const { id, children } = activity;

    return children
      ? traverseNodes(children, id, addNode(activity, parentId, hash))
      : addLeaf(activity, parentId, hash);
  }, hash);
}

/**
 * Add node to ActivityMap
 */
export function addNode(activity: ActivityType, parentId: string, hash: ActivityMap): ActivityMap {
  const { id, name, children } = activity;

  hash[id] = {
    type: 'node',
    id,
    name,
    open: false,
    visible: true,
    parentId: parentId,
    childrenIds: activity.children.map((child) => child.id)
  };

  return hash;
}

/**
 * Add leaf to ActivityMap
 */
export function addLeaf(activity: ActivityType, parentId: string, hash: ActivityMap): ActivityMap {
  const { id, name } = activity;

  hash[id] = {
    type: 'leaf',
    id,
    name,
    selected: false,
    visible: true,
    parentId
  };

  return hash;
}

/**
 * Close activity node and show siblings
 */
export function closeNodeSelector(activityId: string, state: StateMap): ActivityMap {
  const { activityMap, rootNodes } = state;
  const { parentId } = activityMap[activityId];

  const childrenIds = parentId
    ? (activityMap[parentId] as ActivityNode).childrenIds
    : rootNodes;

  return childrenIds.reduce((acc, childId) => {
    acc[childId] = {
      ...activityMap[childId],
      open: false,
      visible: true
    };

    return acc;
  }, {});
}

export function closeAllNodes({ activityMap }: StateMap): ActivityMap {
  return Object.keys(activityMap).reduce((acc, activityId) => {
    const activityType = activityMap[activityId];

    if (activityType.type === 'node') {
      acc[activityId] = {
        ...activityType,
        open: false,
        visible: true
      };
    }

    return acc;
  }, {});
}

/**
 * Open activity node and hide siblings
 */
export function openNodeSelector(activityId: string, state: StateMap): ActivityMap {
  const { activityMap, rootNodes } = state;
  const { parentId } = activityMap[activityId];

  const childrenIds = parentId
    ? (activityMap[parentId] as ActivityNode).childrenIds
    : rootNodes;

  return childrenIds.reduce((acc, childId) => {
    acc[childId] = {
      ...activityMap[childId],
      open: childId === activityId,
      visible: childId === activityId
    };

    return acc;
  }, {});
}
