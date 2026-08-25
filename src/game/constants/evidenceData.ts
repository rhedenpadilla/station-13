export interface EvidenceItem {
  id: string;
  category: 'RADIO' | 'BLACK_TIDE' | 'PERSONNEL' | 'BEACON' | 'ANOMALIES';
  title: string;
  subtitle: string;
  summary: string;
  timestamp: string;
  icon: 'radio' | 'file' | 'tape' | 'zap' | 'alert';
  connectedTo: string[]; // IDs of related evidence items
  unlockedByDefault?: boolean;
}

export const EVIDENCE_DATABASE: Record<string, EvidenceItem> = {
  signal_13_first: {
    id: 'signal_13_first',
    category: 'RADIO',
    title: 'Signal 13.13 MHz Intercept',
    subtitle: 'Automated Carrier Anomaly',
    summary: 'At 01:13 AM, an unidentified transmission cut through the static warning: "Restore the beacon circuit. Do not let the light go out."',
    timestamp: '01:13 AM',
    icon: 'radio',
    connectedTo: ['black_tide_incident', 'beacon_system'],
    unlockedByDefault: true,
  },
  black_tide_incident: {
    id: 'black_tide_incident',
    category: 'BLACK_TIDE',
    title: '1986 Black Tide Incident',
    subtitle: 'Official Coastal Maritime Report',
    summary: 'A cargo vessel vanished off Sector 13 during a storm after dispatching distress calls. The station operator dismissed the signals as atmospheric interference.',
    timestamp: 'Archive 1986',
    icon: 'file',
    connectedTo: ['former_operator_log', 'signal_13_first', 'beacon_system'],
  },
  former_operator_log: {
    id: 'former_operator_log',
    category: 'PERSONNEL',
    title: 'Operator Vance\'s Handover Note',
    subtitle: 'Maintenance Record',
    summary: 'Chief Tech Vance left emergency instructions to recover a 200A ceramic fuse from the Observation Deck supply locker if the beacon breaker tripped.',
    timestamp: '01:00 AM',
    icon: 'file',
    connectedTo: ['black_tide_incident', 'tape_a_recording'],
    unlockedByDefault: true,
  },
  station_blueprint_grid: {
    id: 'station_blueprint_grid',
    category: 'ANOMALIES',
    title: 'Torn Floorplan & Grid Notes',
    subtitle: 'Recovered from Archive Desk',
    summary: 'The blueprint reveals a hidden compartment behind the crew photograph in the Sleeping Quarters (Sector SQ-04) holding the Archive Cabinet Key.',
    timestamp: 'Archive File',
    icon: 'file',
    connectedTo: ['sleeping_quarters_photo', 'tape_a_recording'],
  },
  sleeping_quarters_photo: {
    id: 'sleeping_quarters_photo',
    category: 'ANOMALIES',
    title: 'Shift Photo Anomaly',
    subtitle: 'Wall Frame in Bunk Room',
    summary: 'The photograph shows the station crew. Upon closer examination, the figure in the center resembles the current operator, Eli Navarro, dated decades ago.',
    timestamp: 'Visual Observation',
    icon: 'alert',
    connectedTo: ['station_blueprint_grid', 'time_loop_evidence'],
  },
  tape_a_recording: {
    id: 'tape_a_recording',
    category: 'RADIO',
    title: 'Cassette Tape #1: Black Tide Log',
    subtitle: 'Recovered Audio Reel',
    summary: 'A distorted voice recounts the 1986 distress call and repeats the hidden calibration frequency: "Tune receiver to 14.28 MHz. The light cuts through time."',
    timestamp: 'Tape Playback',
    icon: 'tape',
    connectedTo: ['black_tide_incident', 'second_radio_frequency'],
  },
  second_radio_frequency: {
    id: 'second_radio_frequency',
    category: 'RADIO',
    title: '14.28 MHz Lost Carrier Wave',
    subtitle: 'Anomalous Channel Synchronized',
    summary: 'Transmitting on 14.28 MHz reveals the voice of the stranded vessel. They require the emergency beacon calibrated to 240° Azimuth and 85% Power to navigate the shoals.',
    timestamp: 'Radio Tuning',
    icon: 'radio',
    connectedTo: ['tape_a_recording', 'beacon_calibration_data'],
  },
  beacon_calibration_data: {
    id: 'beacon_calibration_data',
    category: 'BEACON',
    title: 'Beacon Calibration Note',
    subtitle: 'High-Voltage Optical Relay',
    summary: 'Calibration parameters established: 13.13 MHz carrier synchronization, 85% generator output power, and 240° South-West azimuth alignment.',
    timestamp: 'Technical Manual',
    icon: 'zap',
    connectedTo: ['second_radio_frequency', 'beacon_system', 'time_loop_evidence'],
  },
  beacon_system: {
    id: 'beacon_system',
    category: 'BEACON',
    title: 'Emergency Storm Beacon',
    subtitle: 'Observation Deck Array',
    summary: 'The beacon is not just a warning light; its high-voltage optical pulse acts as a temporal relay across the Black Tide squalls.',
    timestamp: 'System Status',
    icon: 'zap',
    connectedTo: ['signal_13_first', 'beacon_calibration_data'],
  },
  time_loop_evidence: {
    id: 'time_loop_evidence',
    category: 'ANOMALIES',
    title: 'The 01:13 AM Paradox',
    subtitle: 'Temporal Synchronization',
    summary: 'Station clocks continuously stall at 01:13 AM. Signal 13 is our own future broadcast trying to break the cycle of the Black Tide tragedy.',
    timestamp: 'Core Revelation',
    icon: 'alert',
    connectedTo: ['sleeping_quarters_photo', 'beacon_calibration_data', 'signal_13_first'],
  },
};
