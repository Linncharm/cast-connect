import { Role } from '@/types';
import ActorCard from '@/components/Cast/components/ActorCard';
import {  useTranslations } from 'next-intl';

interface CommonCastResult {
  id: number;
  name: string;
  profile_path: string | null;
  showAppearances: {
    showName: string;
    showId: number; // 添加 showId
    roles: Role[];
  }[];
  totalEpisodes: number;
}

interface CommonCastResultsProps {
  results: CommonCastResult[];
  expandedActors: Set<number>;
  onActorExpand: (id: number) => void;
}

export function CommonCastResults({
  results,
  expandedActors,
  onActorExpand,
}: CommonCastResultsProps) {

  const t = useTranslations('CommonCastResults');
  if (results.length === 0) return null;

  return (
    <div className="mt-8">
      <h2 className="text-xl font-bold mb-4">
        {t('title')}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {results.map(actor => (
          <ActorCard
            key={actor.id}
            actor={actor}
            isExpanded={expandedActors.has(actor.id)}
            onExpand={() => onActorExpand(actor.id)}
          />
        ))}
      </div>
    </div>
  );
}
