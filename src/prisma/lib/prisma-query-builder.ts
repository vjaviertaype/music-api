export function buildPaginationQuery({
  skip = 0,
  take = 10,
}: {
  skip?: number;
  take?: number;
}) {
  return { skip, take };
}

export function buildOrderQuery({
  orderBy = 'createdAt',
  orderDirection = 'desc',
}: {
  orderBy?: string;
  orderDirection?: 'asc' | 'desc';
}) {
  return {
    [orderBy]: orderDirection,
  };
}
