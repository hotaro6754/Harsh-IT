import { useState, useEffect } from 'react';

export interface GitHubStats {
  stars: number;
  forks: number;
}

const DEFAULT_STATS: GitHubStats = {
  stars: 1542,
  forks: 218,
};

export function useGitHubStats(repo: string) {
  const [stats, setStats] = useState<GitHubStats>(DEFAULT_STATS);

  useEffect(() => {
    async function fetchStats() {
      try {
        const response = await fetch(`https://api.github.com/repos/${repo}`);
        if (!response.ok) throw new Error('Failed to fetch stats');
        const data = await response.json();
        setStats({
          stars: data.stargazers_count,
          forks: data.forks_count,
        });
      } catch (error) {
        console.error('GitHub fetch error, using fallback:', error);
        setStats(DEFAULT_STATS);
      }
    }

    fetchStats();
  }, [repo]);

  return stats;
}
