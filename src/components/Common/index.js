import React from "react";
import { FixedSizeList as List } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";

export const InlineError = ({ message }) => (
  <div className="inline-error">{message}</div>
);

export const VirtualList = ({ children, itemCount, itemSize }) => (
  <AutoSizer>
    {({ height, width }) => (
      <List
        height={height}
        width={width}
        itemCount={itemCount}
        itemSize={itemSize}
      >
        {children}
      </List>
    )}
  </AutoSizer>
);
