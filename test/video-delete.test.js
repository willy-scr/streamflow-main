const assert = require('node:assert');
const { test } = require('node:test');
const fs = require('fs');
const path = require('path');
const Video = require('../models/Video');

const uploadsDir = path.join(__dirname, '..', 'public', 'uploads', 'videos');

test('deleteMultiple removes videos and files', async () => {
  fs.mkdirSync(uploadsDir, { recursive: true });
  const file1 = path.join(uploadsDir, 'unit1.mp4');
  const file2 = path.join(uploadsDir, 'unit2.mp4');
  fs.writeFileSync(file1, 'data');
  fs.writeFileSync(file2, 'data');
  const rel1 = path.relative(path.join(__dirname, '..', 'public'), file1);
  const rel2 = path.relative(path.join(__dirname, '..', 'public'), file2);
  const v1 = await Video.create({ title: 'Unit1', filepath: rel1, thumbnail_path: null, file_size: 4, duration: 0, format: 'mp4', resolution: '720p', bitrate: 0, fps: '30', user_id: null });
  const v2 = await Video.create({ title: 'Unit2', filepath: rel2, thumbnail_path: null, file_size: 4, duration: 0, format: 'mp4', resolution: '720p', bitrate: 0, fps: '30', user_id: null });

  await Video.deleteMultiple([v1.id, v2.id]);

  const check1 = await Video.findById(v1.id);
  const check2 = await Video.findById(v2.id);
  assert.ok(!check1);
  assert.ok(!check2);
  assert.ok(!fs.existsSync(file1));
  assert.ok(!fs.existsSync(file2));
});

