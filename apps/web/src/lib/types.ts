import type { ApiOutput } from "api/trpc/router";
import type { TeamMemberRoleType } from "database";
import type { Component } from "svelte";

export type Post = {
  title: string;
  date: string;
  authorName: string;
  authorImage?: string;
  authorLink?: string;
  slug: string;
  excerpt?: string;
  tags?: string[];
  published?: boolean;
  image?: string;
  url?: string;
};

export type User = ApiOutput["auth"]["user"];

export type TeamMembership = NonNullable<
  NonNullable<ApiOutput["auth"]["user"]>["teamMemberships"]
>[number];

export type MenuItems = Array<{
  title: string;
  avatar: {
    component: Component<{ name: string }>;
    props: {
      [key: string]: unknown;
    };
  };
  items: Array<{
    title: string;
    href: string;
  }>;
}>;

export type AdminMenuItems = Array<{
  title: string;
  href: string;
  icon: Component<{ size: number }>;
}>;

export interface RoleOption {
  label: string;
  value: TeamMemberRoleType;
}

export interface PaginationProps {
  className?: string;
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  onChangeCurrentPage: (page: number) => void;
}
