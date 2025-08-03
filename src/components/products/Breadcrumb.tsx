"use client";

import { Breadcrumb, BreadcrumbItem, BreadcrumbList } from "../ui/breadcrumb";
import Link from "next/link";
import { Separator } from "../ui/separator";
import { useEffect, useState } from "react";
import { GetCategoryAndTitleBySlug } from "@/actions";
import { Skeleton } from "../ui/skeleton";

interface Props {
  slug: string;
}

export const BreadcrumbProduct = ({ slug }: Props) => {
  const [category, setCategory] = useState<string | null>(null);
  const [title, setTitle] = useState<string | null>(null);

  useEffect(() => {
    const getData = async () => {
      const data = await GetCategoryAndTitleBySlug(slug);
      if (data) {
        setCategory(data.category);
        setTitle(data.title);
      }
    };

    getData();
  }, [slug]);

  if (!category || !title)
    return (
      <div className="flex items-center space-x-2">
        <Skeleton className="animate-pulse bg-accent w-[35px] h-[20px]" />
        <Separator orientation="vertical" />
        <Skeleton className="animate-pulse bg-accent w-[70px] h-[20px]" />
        <Separator orientation="vertical" />
        <Skeleton className="animate-pulse bg-accent w-[150px] h-[20px]" />
      </div>
    );

  return (
    <Breadcrumb className="flex space-x-4 items-center">
      <BreadcrumbList>
        <BreadcrumbItem>
          <Link href="/">Inicio</Link>
        </BreadcrumbItem>

        <Separator orientation="vertical" />

        <BreadcrumbItem>
          <Link href={`/category/${category}`}>{category}</Link>
        </BreadcrumbItem>

        <Separator orientation="vertical" />

        <BreadcrumbItem>
          <span>{title}</span>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};
