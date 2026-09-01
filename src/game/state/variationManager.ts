import { NoteData } from '../constants/gameData';

export interface StoryVariation {
  id: string;
  name: string;
  conditionDescription: string;
  category: 'RADIO' | 'DOCUMENT' | 'ENVIRONMENT' | 'OCEAN';
  description: string;
}

export const AUTHORED_VARIATIONS: Record<string, StoryVariation> = {
  VAR_RADIO_ECHO_1313: {
    id: 'VAR_RADIO_ECHO_1313',
    name: 'Beacon Echo Carrier Intercept',
    conditionDescription: 'Requires at least one ending completed (or Beacon Ending unlocked)',
    category: 'RADIO',
    description: 'A harmonic echo is detected along the 13.13 MHz carrier wave during replay shifts, reflecting future beacon illumination back into the receiver.',
  },
  VAR_ARCHIVE_VANCE_LETTER: {
    id: 'VAR_ARCHIVE_VANCE_LETTER',
    name: 'Vance’s Cycle 13 Unsent Letter',
    conditionDescription: 'Unlocked in New Game+ or after Black Tide archive investigation',
    category: 'DOCUMENT',
    description: 'An annotated secondary document found in the Archive Room detailing Vance’s observation of repeating shifts and temporal footprint marks.',
  },
  VAR_GLITCHED_CHART_ANOMALY: {
    id: 'VAR_GLITCHED_CHART_ANOMALY',
    name: 'Bunk Room Shifting Telemetry Grid',
    conditionDescription: 'Unlocked in New Game+ / Chapter Replay',
    category: 'ENVIRONMENT',
    description: 'The wall chart in Sector SQ-04 reveals shifting hydrographic coordinates and subtle temporal resonance symbols.',
  },
  VAR_OCEAN_TIMELINE_FLASH: {
    id: 'VAR_OCEAN_TIMELINE_FLASH',
    name: 'Resonant Sea Light Pulse',
    conditionDescription: 'Requires Silent Frequency or Unknown Signal ending unlocked',
    category: 'OCEAN',
    description: 'The distant ocean trench flash across the Observation Deck horizon cycles with alternate timing, matching the carrier frequency pulses.',
  },
};

export const VANCE_UNSENT_LETTER: NoteData = {
  id: 'vance_unsent_letter',
  title: "CHIEF TECH VANCE: UNSENT LETTER (CYCLE 13)",
  subtitle: "Recovered from Archive Desk Drawer",
  date: "October 13, 01:13 AM (Station Cycle)",
  author: "Chief Tech R. Vance",
  content: [
    "To whoever finds this after the breaker trips:",
    "This isn't my first time writing this handover. Every time the storm peaks at 01:13 AM, the wet footsteps appear in the hall before anyone has even walked out to the deck.",
    "The radio receiver doesn't just catch ships at sea. It acts as an acoustic bridge. If you've been here before, you already know where the fuse is hidden.",
    "Trust the optical beam. Break the cycle, or let the station hold the frequency forever.",
  ],
};

export const HYDROGRAPHIC_SURVEY_NOTE: NoteData = {
  id: 'hydrographic_survey_note',
  title: "HYDROGRAPHIC SURVEY: BLACK TIDE TRENCH",
  subtitle: "Coastal Station Hydrophone Analysis",
  date: "October 13, 1986 / Present",
  author: "Meteorological Survey Division",
  content: [
    "SURVEY DEPTH: 1,400 fathoms off Station 13 cliffs.",
    "ACOUSTIC ANOMALY: Continuous low-frequency harmonic resonance at 13.13 Hz perfectly matching the HF radio carrier wave.",
    "TEMPORAL NOTE: The ocean trench acts as an electromagnetic waveguide. Signals transmitted tonight are returned simultaneously in 1986 and the present.",
  ],
};
