import { Role } from '@/types';
import ActorCard from '@/components/Cast/components/ActorCard';
import { useTranslations } from 'next-intl';

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
      <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white   " style={{ gridTemplateRows: 'auto' }}>
        {t('title')}
      </h2>
      <div className="flex flex-col md:flex-row gap-4">
        {/* 左列 */}
        <div className="flex-1 flex flex-col gap-4">
          {results.filter((_, index) => index % 2 === 0).map(actor => (
            <ActorCard
              key={actor.id}
              actor={actor}
              isExpanded={expandedActors.has(actor.id)}
              onExpand={() => onActorExpand(actor.id)}
            />
          ))}
        </div>

        {/* 右列 */}
        <div className="flex-1 flex flex-col gap-4">
          {results.filter((_, index) => index % 2 === 1).map(actor => (
            <ActorCard
              key={actor.id}
              actor={actor}
              isExpanded={expandedActors.has(actor.id)}
              onExpand={() => onActorExpand(actor.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
