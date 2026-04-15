export function getRelativeTime(date: Date): string {
  const now = new Date();
  const diff = now.getTime() - date.getTime();

  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);
  const years = Math.floor(months / 12);

  if (years > 0) {
    return `Hace ${years} ${years === 1 ? 'año' : 'años'}`;
  }

  if (months > 0) {
    return `Hace ${months} ${months === 1 ? 'mes' : 'meses'}`;
  }

  if (days > 0) {
    return `Hace ${days} ${days === 1 ? 'día' : 'días'}`;
  }

  if (hours > 0) {
    return `Hace ${hours} ${hours === 1 ? 'hora' : 'horas'}`;
  }

  if (minutes > 0) {
    return `Hace ${minutes} ${minutes === 1 ? 'minuto' : 'minutos'}`;
  }

  return `Hace unos segundos`;
}