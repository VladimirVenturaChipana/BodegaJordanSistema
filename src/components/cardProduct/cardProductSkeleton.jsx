import { Skeleton, Card, CardContent } from '@mui/material';

export default function CardProductoSkeleton() {
  return (
    <Card sx={{ width: '100%', height: 'auto', display: 'flex', flexDirection: 'column' }}>
      <Skeleton variant="rectangular" sx={{ height: { xs: 120, sm: 200 } }} />
      <CardContent sx={{ p: { xs: 1.5, sm: 2 }, minHeight: { xs: 130, sm: 160 } }}>
        <Skeleton variant="text" width="40%" sx={{ fontSize: '0.75rem' }} />
        <Skeleton variant="text" width="90%" />
        <Skeleton variant="text" width="60%" />
        <Skeleton variant="text" width="30%" sx={{ mt: 1, fontSize: '0.75rem' }} />
        <Skeleton variant="text" width="50%" sx={{ mt: 2, fontSize: '1.25rem' }} />
      </CardContent>
    </Card>
  )
}