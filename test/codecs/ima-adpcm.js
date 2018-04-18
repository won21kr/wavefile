/*!
 * Copyright (c) 2018 Rafael da Silva Rocha.
 * 
 */

var assert = require('assert');

describe('16-bit to 4-bit', function() {
    let fs = require("fs");
    let WaveFile = require("../../index.js");
    let path = "test/files/";
    
    let wav = new WaveFile(
        fs.readFileSync(path + "16-bit-8kHz-noBext-mono.wav"));

    wav.toIMAADPCM();

    let wav2 = new WaveFile(wav.toBuffer());
    fs.writeFileSync(path + "/out/4bit-imaadpcm-8kHz-noBext-mono-encoded.wav", wav2.toBuffer());

    it("chunkId should be 'RIFF'",
            function() {
        assert.equal(wav2.chunkId, "RIFF");
    });
    it("fmtChunkId should be 'fmt '",
            function() {
        assert.equal(wav2.fmtChunkId, "fmt ");
    });
    it("format should be 'WAVE'",
            function() {
        assert.equal(wav2.format, "WAVE");
    });
    it("fmtChunkSize should be 20",
            function() {
        assert.equal(wav2.fmtChunkSize, 20);
    });
    it("audioFormat should be 17 (IMA ADPCM)",
            function() {
        assert.equal(wav2.audioFormat, 17);
    });
    it("numChannels should be 1",
            function() {
        assert.equal(wav2.numChannels, 1);
    });
    it("sampleRate should be 8000",
            function() {
        assert.equal(wav2.sampleRate, 8000);
    });

    it("blockAlign should be 256",
            function() {
        assert.equal(wav2.blockAlign, 256);
    });
    it("bitsPerSample should be 4",
            function() {
        assert.equal(wav2.bitsPerSample, 4);
    });
    it("factChunkId should be 'fact' on the new file",
            function() {
        assert.equal(wav2.factChunkId, 'fact');
    });
    
    it("dataChunkId should be 'data'",
            function() {
        assert.equal(wav2.dataChunkId, 'data');
    });
    it("dataChunkSize should be > 0",
            function() {
        assert.ok(wav2.dataChunkSize > 0);
    });
    it("samples.length should be > 0",
            function() {
        assert.ok(wav2.samples.length > 0);
    });
});


describe('4-bit to 16-bit (4-bit encoded with wavefile.js)', function() {
    let fs = require("fs");
    let WaveFile = require("../../index.js");
    let path = "test/files/";
    
    let wav = new WaveFile(
        fs.readFileSync(path + "/4bit-imaadpcm-8kHz-noBext-mono-encoded.wav"));

    wav.fromIMAADPCM();

    let wav2 = new WaveFile(wav.toBuffer());
    fs.writeFileSync(path + "/out/16bit-8kHz-noBext-mono-decoded.wav",
        wav2.toBuffer());

    it("chunkId should be 'RIFF'",
            function() {
        assert.equal(wav2.chunkId, "RIFF");
    });
    it("fmtChunkId should be 'fmt '",
            function() {
        assert.equal(wav2.fmtChunkId, "fmt ");
    });
    it("format should be 'WAVE'",
            function() {
        assert.equal(wav2.format, "WAVE");
    });
    it("fmtChunkSize should be 16",
            function() {
        assert.equal(wav2.fmtChunkSize, 16);
    });
    it("audioFormat should be 17 (IMA ADPCM)",
            function() {
        assert.equal(wav2.audioFormat, 1);
    });
    it("numChannels should be 1",
            function() {
        assert.equal(wav2.numChannels, 1);
    });
    it("sampleRate should be 8000",
            function() {
        assert.equal(wav2.sampleRate, 8000);
    });

    it("blockAlign should be 256",
            function() {
        assert.equal(wav2.blockAlign, 2);
    });
    it("bitsPerSample should be 4",
            function() {
        assert.equal(wav2.bitsPerSample, 16);
    });
    
    it("dataChunkId should be 'data'",
            function() {
        assert.equal(wav2.dataChunkId, 'data');
    });
    it("dataChunkSize should be > 0",
            function() {
        assert.ok(wav2.dataChunkSize > 0);
    });
    it("samples.length should be > 0",
            function() {
        assert.ok(wav2.samples.length > 0);
    });
});

describe('4-bit to 16-bit (existing 4-bit wave file)', function() {
    let fs = require("fs");
    let WaveFile = require("../../index.js");
    let path = "test/files/";
    
    let wav = new WaveFile(
        fs.readFileSync(path + "/4bit-imaadpcm-8kHz-noBext-mono.wav"));

    wav.fromIMAADPCM();

    let wav2 = new WaveFile(wav.toBuffer());
    fs.writeFileSync(path + "/out/16bit-8kHz-noBext-mono-decoded-source2.wav",
        wav2.toBuffer());

    it("chunkId should be 'RIFF'",
            function() {
        assert.equal(wav2.chunkId, "RIFF");
    });
    it("fmtChunkId should be 'fmt '",
            function() {
        assert.equal(wav2.fmtChunkId, "fmt ");
    });
    it("format should be 'WAVE'",
            function() {
        assert.equal(wav2.format, "WAVE");
    });
    it("fmtChunkSize should be 16",
            function() {
        assert.equal(wav2.fmtChunkSize, 16);
    });
    it("audioFormat should be 1",
            function() {
        assert.equal(wav2.audioFormat, 1);
    });
    it("numChannels should be 1",
            function() {
        assert.equal(wav2.numChannels, 1);
    });
    it("sampleRate should be 8000",
            function() {
        assert.equal(wav2.sampleRate, 8000);
    });

    it("blockAlign should be 2",
            function() {
        assert.equal(wav2.blockAlign, 2);
    });
    it("bitsPerSample should be 16",
            function() {
        assert.equal(wav2.bitsPerSample, 16);
    });
    
    it("dataChunkId should be 'data'",
            function() {
        assert.equal(wav2.dataChunkId, 'data');
    });
    it("dataChunkSize should be > 0",
            function() {
        assert.ok(wav2.dataChunkSize > 0);
    });
    it("samples.length should be > 0",
            function() {
        assert.ok(wav2.samples.length > 0);
    });
});

describe('4-bit to 16-bit (1024 blockalign)', function() {
    let fs = require("fs");
    let WaveFile = require("../../index.js");
    let path = "test/files/";
    
    let wav = new WaveFile(
        fs.readFileSync(path + "/4-bit-imaadpcm-8kHz-noBext-mono-reaper.wav"));

    wav.fromIMAADPCM(1024);

    let wav2 = new WaveFile(wav.toBuffer());
    fs.writeFileSync(path + "/out/16bit-8kHz-noBext-mono-decoded-reaper.wav",
        wav2.toBuffer());

    it("chunkId should be 'RIFF'",
            function() {
        assert.equal(wav2.chunkId, "RIFF");
    });
    it("fmtChunkId should be 'fmt '",
            function() {
        assert.equal(wav2.fmtChunkId, "fmt ");
    });
    it("format should be 'WAVE'",
            function() {
        assert.equal(wav2.format, "WAVE");
    });
    it("fmtChunkSize should be 16",
            function() {
        assert.equal(wav2.fmtChunkSize, 16);
    });
    it("audioFormat should be 1",
            function() {
        assert.equal(wav2.audioFormat, 1);
    });
    it("numChannels should be 1",
            function() {
        assert.equal(wav2.numChannels, 1);
    });
    it("sampleRate should be 8000",
            function() {
        assert.equal(wav2.sampleRate, 8000);
    });

    it("blockAlign should be 2",
            function() {
        assert.equal(wav2.blockAlign, 2);
    });
    it("bitsPerSample should be 16",
            function() {
        assert.equal(wav2.bitsPerSample, 16);
    });
    
    it("dataChunkId should be 'data'",
            function() {
        assert.equal(wav2.dataChunkId, 'data');
    });
    it("dataChunkSize should be > 0",
            function() {
        assert.ok(wav2.dataChunkSize > 0);
    });
    it("samples.length should be > 0",
            function() {
        assert.ok(wav2.samples.length > 0);
    });
});