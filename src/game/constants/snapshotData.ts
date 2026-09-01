export interface SnapshotItem {
  id: string;
  title: string;
  category: 'ALTERED_OBJECTS' | 'RADIO_ANOMALIES' | 'OCEAN_SIGHTINGS' | 'STATION_RECORDS' | 'SIGNAL_TOWER_EVENTS';
  location: string;
  chapter: string;
  description: string;
  iconType: 'clock' | 'photo' | 'radio' | 'waves' | 'file' | 'tower' | 'sparkles' | 'eye';
  timestampLabel: string;
  accentColor: string;
}

export const SNAPSHOT_DATABASE: Record<string, SnapshotItem> = {
  snap_glitched_clock: {
    id: 'snap_glitched_clock',
    title: 'Stalled Clock (01:13 AM)',
    category: 'ALTERED_OBJECTS',
    location: 'Sleeping Quarters (Sector SQ-04)',
    chapter: 'The Night Shift',
    description: 'The analog wall clock in the crew quarters refuses to advance past 01:13 AM. Even when rewound, the second hand freezes the moment electromagnetic spikes occur.',
    iconType: 'clock',
    timestampLabel: 'Shift Start',
    accentColor: '#38BDF8',
  },
  snap_shifting_photo: {
    id: 'snap_shifting_photo',
    title: '1986 Crew Photograph',
    category: 'ALTERED_OBJECTS',
    location: 'Sleeping Quarters (Sector SQ-04)',
    chapter: 'Black Tide Records',
    description: 'The framed crew photograph from the 1986 shift. The center operator bears Eli Navarro’s facial features, dated three decades prior. The key to ARCH-02 was lodged behind its glass backing.',
    iconType: 'photo',
    timestampLabel: 'Inspection',
    accentColor: '#F5B960',
  },
  snap_first_carrier: {
    id: 'snap_first_carrier',
    title: 'Carrier Wave Spike (13.13 MHz)',
    category: 'RADIO_ANOMALIES',
    location: 'Radio Control Room',
    chapter: 'Frequency 13.13',
    description: 'A sharp electromagnetic spike cutting through atmospheric white noise. The transmission audio repeats: "Do not let the light go out."',
    iconType: 'radio',
    timestampLabel: '01:13 AM',
    accentColor: '#39D9E6',
  },
  snap_ghost_freq_1428: {
    id: 'snap_ghost_freq_1428',
    title: 'Ghost Channel (14.28 MHz)',
    category: 'RADIO_ANOMALIES',
    location: 'Radio Control Room',
    chapter: 'Beacon Calibration',
    description: 'The long-lost distress channel of the S.S. Calypso. Transmitting on 14.28 MHz connects directly to the ship’s bridge across the squall.',
    iconType: 'waves',
    timestampLabel: 'Tape Playback',
    accentColor: '#63D471',
  },
  snap_ocean_trench_light: {
    id: 'snap_ocean_trench_light',
    title: 'Black Tide Trench Flash',
    category: 'OCEAN_SIGHTINGS',
    location: 'Observation Deck',
    chapter: 'The Night Shift',
    description: 'During severe lightning discharges, strange synchronized pulses illuminate the sea foam over the Black Tide Trench, miles out from the cliffline.',
    iconType: 'eye',
    timestampLabel: 'Storm Surge',
    accentColor: '#38BDF8',
  },
  snap_black_tide_file: {
    id: 'snap_black_tide_file',
    title: 'Inquiry Report 1986-D',
    category: 'STATION_RECORDS',
    location: 'Archive Room (Sector AR-01)',
    chapter: 'Black Tide Records',
    description: 'Confidential Department of Maritime Safety document detailing the disappearance of the cargo freighter and the unexplained operator dismissal of signals.',
    iconType: 'file',
    timestampLabel: 'Archive File',
    accentColor: '#F5B960',
  },
  snap_vance_letter: {
    id: 'snap_vance_letter',
    title: 'Chief Vance’s Directives',
    category: 'STATION_RECORDS',
    location: 'Radio Desk / Hallway',
    chapter: 'The Night Shift',
    description: 'Emergency handover notes instructing the operator on breaker failovers and warning of anomalous repeating shifts.',
    iconType: 'file',
    timestampLabel: 'Handover Log',
    accentColor: '#93C5FD',
  },
  snap_beacon_optical_array: {
    id: 'snap_beacon_optical_array',
    title: 'High-Voltage Optical Relay',
    category: 'SIGNAL_TOWER_EVENTS',
    location: 'Observation Deck & Tower',
    chapter: 'Beacon Calibration',
    description: 'The multi-tiered Fresnel prism array calibrated to 13.13 MHz, 85% Power, and 240° Azimuth, creating a focused beam capable of piercing temporal fog.',
    iconType: 'sparkles',
    timestampLabel: 'Calibration Peak',
    accentColor: '#F5B960',
  },
  snap_tower_dossier: {
    id: 'snap_tower_dossier',
    title: '1986 Upper Tower Log',
    category: 'SIGNAL_TOWER_EVENTS',
    location: 'Upper Signal Tower',
    chapter: 'Signal Tower',
    description: 'The final journal entry written by Eli Vance Navarro confirming the temporal nature of Station 13 and the decision to lock the carrier wave permanently.',
    iconType: 'tower',
    timestampLabel: 'Tower Peak',
    accentColor: '#C084FC',
  },
};
