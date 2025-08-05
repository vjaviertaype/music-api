import { Prisma } from '@prisma/client';
import { FindAllUsersDto } from './dto/find-all-user.dto';
import {
  buildOrderQuery,
  buildPaginationQuery,
} from 'prisma/lib/prisma-query-builder';
import { findOneUserDto } from './dto/find-one-user.dto';
import { FieldsUserDto } from './dto/fields-user.dto';
import { RelationsUserDto } from './dto/relations-user.dto';

export function buildUserWhere(filter: FindAllUsersDto): Prisma.UserWhereInput {
  const { email, name, isActive, createdAfter, createdBefore } = filter;

  const createdAtFilter: Prisma.DateTimeFilter = {};
  if (createdAfter) createdAtFilter.gte = createdAfter;
  if (createdBefore) createdAtFilter.lte = createdBefore;

  const where: Prisma.UserWhereInput = {
    ...(email && { email: { contains: email, mode: 'insensitive' } }),
    ...(name && { name: { contains: name, mode: 'insensitive' } }),
    ...(isActive !== undefined && { isActive }),
    ...(Object.keys(createdAtFilter).length > 0 && {
      createdAt: createdAtFilter,
    }),
  };

  return where;
}

export function buildUserSelect(fields?: FieldsUserDto): Prisma.UserSelect {
  return {
    id: fields?.id ?? true,
    email: fields?.email ?? true,
    name: fields?.name ?? true,
    role: fields?.role ?? true,
    createdAt: fields?.createdAt ?? true,
    updatedAt: fields?.updatedAt ?? true,
    password: fields?.password ?? false, // Nunca incluir password
  };
}

export function buildUserInclude(
  relations?: RelationsUserDto,
): Prisma.UserInclude {
  return {
    albums: relations?.albums ?? false,
    subscriptions: relations?.subscriptions ?? false,
    followers: relations?.followers ?? false,
    notifications: relations?.notifications ?? false,
  };
}

export function buildUserFindManyArgs(
  filter: FindAllUsersDto,
): Prisma.UserFindManyArgs {
  const hasRelations =
    filter.relations && Object.values(filter.relations).some(Boolean);

  const select = hasRelations ? undefined : buildUserSelect(filter.fields);
  const include = hasRelations ? buildUserInclude(filter.relations) : undefined;

  const where = buildUserWhere(filter);
  const pagination = buildPaginationQuery(filter);
  const orderBy = buildOrderQuery(filter);

  return {
    where,
    select,
    include,
    orderBy,
    ...pagination,
  };
}

export function buildUserFindUniqueArgs(
  filter: findOneUserDto,
): Prisma.UserFindUniqueArgs {
  const { uniqueFilter, relations, fields } = filter;

  if (!uniqueFilter.id && !uniqueFilter.email) {
    throw new Error('Debe proveer un filtro único: id o email');
  }

  const select =
    relations && Object.values(relations).some(Boolean)
      ? undefined
      : buildUserSelect(fields);
  const include = relations ? buildUserInclude(relations) : undefined;

  const where = uniqueFilter.id
    ? { id: uniqueFilter.id }
    : { email: uniqueFilter.email! };

  return {
    where,
    select,
    include,
  };
}
