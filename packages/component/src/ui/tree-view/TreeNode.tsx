import { useEffect } from 'react';
import { useDrag, useDrop } from 'react-dnd';

import {
  StyledCollapse,
  StyledNodeLine,
  StyledTreeNodeContainer,
  StyledTreeNodeWrapper,
} from './styles';
import type {
  Node,
  NodeLIneProps,
  TreeNodeItemProps,
  TreeNodeProps,
} from './types';

const NodeLine = <RenderProps,>({
  node,
  onDrop,
  allowDrop = true,
  isTop = false,
}: NodeLIneProps<RenderProps>) => {
  const [{ isOver }, drop] = useDrop(
    () => ({
      accept: 'node',
      drop: (item: Node<RenderProps>, monitor) => {
        const didDrop = monitor.didDrop();
        if (didDrop) {
          return;
        }
        onDrop?.(item.id, node.id, {
          internal: false,
          topLine: isTop,
          bottomLine: !isTop,
        });
      },
      collect: monitor => ({
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
      }),
    }),
    [onDrop]
  );

  return <StyledNodeLine ref={drop} show={isOver && allowDrop} isTop={isTop} />;
};
const TreeNodeItemWithDnd = <RenderProps,>({
  node,
  allowDrop,
  setCollapsed,
  ...otherProps
}: TreeNodeItemProps<RenderProps>) => {
  const { onAdd, onDelete, onDrop } = otherProps;

  const [{ canDrop, isOver }, drop] = useDrop(
    () => ({
      accept: 'node',
      drop: (item: Node<RenderProps>, monitor) => {
        const didDrop = monitor.didDrop();
        if (didDrop || item.id === node.id || !allowDrop) {
          return;
        }
        onDrop?.(item.id, node.id, {
          internal: true,
          topLine: false,
          bottomLine: false,
        });
      },
      collect: monitor => ({
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop() && allowDrop,
      }),
    }),
    [onDrop, allowDrop]
  );

  useEffect(() => {
    if (isOver && canDrop) {
      setCollapsed(node.id, false);
    }
  }, [isOver, canDrop, setCollapsed, node.id]);

  return (
    <TreeNodeItem
      dropRef={drop}
      onAdd={onAdd}
      onDelete={onDelete}
      node={node}
      allowDrop={allowDrop}
      setCollapsed={setCollapsed}
      isOver={isOver}
      canDrop={canDrop}
      {...otherProps}
    />
  );
};

const TreeNodeItem = <RenderProps,>({
  node,
  collapsed,
  setCollapsed,
  selectedId,
  isOver = false,
  canDrop = false,
  onAdd,
  onDelete,
  dropRef,
  disableCollapse,
}: TreeNodeItemProps<RenderProps>) => {
  return (
    <div ref={dropRef}>
      {node.render?.(node, {
        isOver: isOver && canDrop,
        onAdd: () => onAdd?.(node.id),
        onDelete: () => onDelete?.(node.id),
        collapsed,
        setCollapsed,
        isSelected: selectedId === node.id,
        disableCollapse,
      })}
    </div>
  );
};

export const TreeNodeWithDnd = <RenderProps,>(
  props: TreeNodeProps<RenderProps>
) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'node',
    item: props.node,
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return <TreeNode dragRef={drag} isDragging={isDragging} {...props} />;
};

export const TreeNode = <RenderProps,>({
  node,
  index,
  isDragging = false,
  allowDrop = true,
  dragRef,
  ...otherProps
}: TreeNodeProps<RenderProps>) => {
  const { indent, enableDnd, collapsedIds } = otherProps;
  const collapsed = collapsedIds.includes(node.id);
  const { renderTopLine = true, renderBottomLine = true } = node;

  return (
    <StyledTreeNodeContainer ref={dragRef} isDragging={isDragging}>
      <StyledTreeNodeWrapper>
        {enableDnd && renderTopLine && index === 0 && (
          <NodeLine
            node={node}
            {...otherProps}
            allowDrop={!isDragging && allowDrop}
            isTop={true}
          />
        )}
        {enableDnd ? (
          <TreeNodeItemWithDnd
            node={node}
            index={index}
            allowDrop={allowDrop}
            collapsed={collapsed}
            {...otherProps}
          />
        ) : (
          <TreeNodeItem
            node={node}
            index={index}
            allowDrop={allowDrop}
            collapsed={collapsed}
            {...otherProps}
          />
        )}

        {enableDnd &&
          renderBottomLine &&
          (!node.children?.length || collapsed) && (
            <NodeLine
              node={node}
              {...otherProps}
              allowDrop={!isDragging && allowDrop}
            />
          )}
      </StyledTreeNodeWrapper>
      <StyledCollapse in={!collapsed} indent={indent}>
        {node.children &&
          node.children.map((childNode, index) =>
            enableDnd ? (
              <TreeNodeWithDnd
                key={childNode.id}
                node={childNode}
                index={index}
                allowDrop={isDragging ? false : allowDrop}
                {...otherProps}
              />
            ) : (
              <TreeNode
                key={childNode.id}
                node={childNode}
                index={index}
                allowDrop={false}
                {...otherProps}
              />
            )
          )}
      </StyledCollapse>
    </StyledTreeNodeContainer>
  );
};
