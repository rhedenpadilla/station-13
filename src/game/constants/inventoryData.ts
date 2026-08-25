export interface InventoryItem {
  id: string;
  name: string;
  category: 'KEY' | 'TAPE' | 'DOCUMENT' | 'COMPONENT';
  description: string;
  inspectionDetail: string;
  iconType: 'fuse' | 'key' | 'tape' | 'map' | 'note';
}

export const INVENTORY_ITEMS: Record<string, InventoryItem> = {
  emergency_fuse: {
    id: 'emergency_fuse',
    name: '200A Ceramic Emergency Fuse',
    category: 'COMPONENT',
    description: 'Heavy-duty industrial fuse needed to complete the auxiliary generator breaker circuit.',
    inspectionDetail: 'Stamped: "CLASS-H 200A 600V. HIGH VOLTAGE BEACON CIRCUIT". The ceramic casing is intact.',
    iconType: 'fuse',
  },
  archive_key: {
    id: 'archive_key',
    name: 'Archive Cabinet Key',
    category: 'KEY',
    description: 'Tarnished brass key stamped with "ARCH-02". Found hidden behind the photo frame in the Sleeping Quarters.',
    inspectionDetail: 'Engraved with a weathered station anchor symbol. Fits the locked steel security cabinet in the Archive Room.',
    iconType: 'key',
  },
  cassette_tape_a: {
    id: 'cassette_tape_a',
    name: 'Cassette Tape #1: "BLACK TIDE LOG"',
    category: 'TAPE',
    description: 'A magnetic audio tape labeled "Shift Log - 1986 / Vance & Miller". Found locked in the archive cabinet.',
    inspectionDetail: 'Magnetic tape appears slightly warped by humidity. Requires the archive tape deck to play.',
    iconType: 'tape',
  },
  cassette_tape_b: {
    id: 'cassette_tape_b',
    name: 'Cassette Tape #2: "DISTRESS RELAY"',
    category: 'TAPE',
    description: 'Cassette recovered from the sleeping quarters desk. Contains raw radio frequency telemetry.',
    inspectionDetail: 'Handwritten note taped on side: "If you hear the whistle on 14.28 MHz, do not shut off the carrier."',
    iconType: 'tape',
  },
  torn_station_map: {
    id: 'torn_station_map',
    name: 'Torn Station Blueprint Grid',
    category: 'DOCUMENT',
    description: 'A partial architectural grid map showing hidden wall compartments in the Sleeping Quarters (Sector SQ-04).',
    inspectionDetail: 'A red circle is sketched around Bunk 2 with notes: "Behind the crew photograph frame: Spare cabinet key."',
    iconType: 'map',
  },
  beacon_calibration_note: {
    id: 'beacon_calibration_note',
    name: 'Beacon Calibration Protocol',
    category: 'DOCUMENT',
    description: 'Technical calibration formulas for the high-voltage storm beacon array.',
    inspectionDetail: 'SPECIFICATIONS:\n• Target Frequency: 13.13 MHz\n• Resonant Power: 85%\n• Azimuth Direction: 240° SW (Black Tide Trench)',
    iconType: 'note',
  },
};
