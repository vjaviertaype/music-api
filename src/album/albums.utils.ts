import { Prisma } from '@prisma/client';
import { FindAllAlbumDto } from './dto/find-all-album.dto';
import { FieldsAlbumDto } from './dto/fields-album.dto';
import { RelationsAlbumDto } from './dto/relations-album.dto';
import {
  buildOrderQuery,
  buildPaginationQuery,
} from 'prisma/lib/prisma-query-builder';
import { FindOneAlbumDto } from './dto/find-one-albums.dto';

export function buildAlbumWhere(
  filter: FindAllAlbumDto,
): Prisma.AlbumWhereInput {
  const { id, title, artistId, isSingle, createdAfter, createdBefore } = filter;

  const createdAtFilter: Prisma.DateTimeFilter = {};
  if (createdAfter) createdAtFilter.gte = createdAfter;
  if (createdBefore) createdAtFilter.lte = createdBefore;

  const where: Prisma.AlbumWhereInput = {
    ...(id && { id }),
    ...(title && { title: { contains: title, mode: 'insensitive' } }),
    ...(artistId && { artistId }),
    ...(isSingle !== undefined && { isSingle }),
    ...(Object.keys(createdAtFilter).length > 0 && {
      createdAt: createdAtFilter,
    }),
  };

  return where;
}

export function buildAlbumSelect(fields?: FieldsAlbumDto): Prisma.AlbumSelect {
  return {
    id: fields?.id ?? true,
    title: fields?.title ?? true,
    artistId: fields?.artistId ?? true,
    isSingle: fields?.isSingle ?? true,
    createdAt: fields?.createdAt ?? true,
    updatedAt: fields?.updatedAt ?? true,
  };
}

export function buildAlbumInclude(
  relations?: RelationsAlbumDto,
): Prisma.AlbumInclude {
  return {
    artist: relations?.artist ?? false,
    songs: relations?.songs ?? false,
  };
}

export function buildAlbumFindManyArgs(
  filter: FindAllAlbumDto,
): Prisma.AlbumFindManyArgs {
  const hasRelations =
    filter.relations && Object.values(filter.relations).some(Boolean);

  const select = hasRelations ? undefined : buildAlbumSelect(filter.fields);
  const include = hasRelations
    ? buildAlbumInclude(filter.relations)
    : undefined;

  const where = buildAlbumWhere(filter);
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

export function buildAlbumFindUniqueArgs(
  filter: FindOneAlbumDto,
): Prisma.AlbumFindUniqueArgs {
  const { uniqueFilter, relations, fields } = filter;

  if (!uniqueFilter.id) {
    throw new Error('Debe proveer un filtro único: id');
  }

  const hasRelations = relations && Object.values(relations).some(Boolean);

  const select = hasRelations ? undefined : buildAlbumSelect(fields);
  const include = hasRelations ? buildAlbumInclude(relations) : undefined;

  return {
    where: { id: uniqueFilter.id },
    select,
    include,
  };
}
