import "./Breadcrumb.css";

import * as React from "react";
import classnames from "classnames";

export interface IBreadcrumbProps {
  /**
   * Collection of breadcrumbs to render
   */
  items: IBreadcrumbItem[];
  className?: string;
}

export interface IBreadcrumbItem {
  /**
   * Text to display to the user for the breadcrumb
   */
  text: string;
  /**
   * Arbitrary unique string associated with the breadcrumb
   */
  key: number;
  /**
   * Callback issued when the breadcrumb is selected.
   */
  onClick?: (
    ev?: React.MouseEvent<HTMLElement>,
    item?: IBreadcrumbItem
  ) => void;
}

export const Breadcrumb: React.FunctionComponent<IBreadcrumbProps> = ({
  className,
  items
}) => {
  if (!items) {
    return null;
  }

  return (
    <div className={classnames("TreeMap__breadcrumb", className)}>
      <ul id="breadcrumb">
        {items.map((item: IBreadcrumbItem, index: number) => (
          <li key={index}>
            <a 
              key={item.key}
              id={`${item.key}`}
              style={{ cursor: item.onClick ? "pointer" : "auto" }} 
              onClick={item.onClick ? item.onClick : undefined} 
              className="TreeMap__breadcrumbItem" 
              href="#"><span>{item.text}</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};
