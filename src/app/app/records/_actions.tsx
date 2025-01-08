'use client';

import { Button } from '@/components/ui/button';
import { routes } from '@/const';
import { useRecords } from '@/hooks';
import { format } from 'date-fns';
import { download, generateCsv } from 'export-to-csv';
import { Download, SmilePlus } from 'lucide-react';
import Link from 'next/link';

const Actions = () => {
  const { records, isLoadingRecords } = useRecords();

  const handleCLickExport = () => {
    if (!records.length || isLoadingRecords) return;
    const csv = generateCsv({ useKeysAsHeaders: true })(
      records.map(
        ({
          weather,
          location,
          moods,
          tags,
          createdAt,
          updatedAt,
          id,
          feeling,
          description,
        }) => ({
          id,
          feeling,
          moods: moods.map((mood) => `${mood.title} ${mood.emoji}`).join(' '),
          tags: tags.map((tag) => tag.title).join(' '),
          description,
          weather: `${weather?.temperature}℃ ${weather?.condition}`,
          location: `${location?.region}/${location?.name}`,
          createdAt: format(new Date(createdAt), 'PPp'),
          updatedAt: format(new Date(updatedAt), 'PPp'),
        })
      )
    );
    download({ useKeysAsHeaders: true })(csv);
  };

  if (isLoadingRecords) return null;
  return (
    <>
      <Button asChild>
        <Link href={routes.app.children.addRecord.route}>
          <SmilePlus /> RECORD MOOD
        </Link>
      </Button>
      <Button onClick={handleCLickExport}>
        <Download /> EXPORT
      </Button>
    </>
  );
};

export default Actions;
