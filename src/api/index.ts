interface FetchSnapshotParam {
  url: string;
  timestamp: string;
}

interface FetchSnapshotReturnType {
  available: boolean;
  url: string;
  timestamp: string;
  status: string;
}

export async function fetchSnapshot({
  url,
  timestamp,
}: FetchSnapshotParam): Promise<FetchSnapshotReturnType | undefined> {
  return await fetch(`https://archive.org/wayback/available?url=${url}&timestamp=${timestamp}`)
    .then((res) => res.json())
    .then((data) => data?.archived_snapshots?.closest ?? {});
}
