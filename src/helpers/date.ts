import { subHours } from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';

export function convertUtcToBrasilia(utcTime: string): Date {
  const brasiliaTime = utcToZonedTime(utcTime, 'America/Sao_Paulo');
  return brasiliaTime;
}

export function convertToBrasiliaTime(inputDate: Date): Date {
  const brasiliaTime = subHours(inputDate, 3); // Subtrai 3 horas para ajustar ao fuso do Brasil
  return brasiliaTime;
}

export function getBrasiliaTime(): Date {
  const now = new Date();
  return convertToBrasiliaTime(now);
}
