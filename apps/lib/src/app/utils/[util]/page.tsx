import Utils from './utils'

export default function UtilPage({ params }: { params: { util: string } }) {
  return <Utils util={params.util} />
}
