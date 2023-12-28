import { _decorator, Component, Node, AudioSource, director, AudioClip, resources } from 'cc';
const { ccclass, property } = _decorator;

/**
 * 音频管理单例
 */
@ccclass('AudioManager')
export class AudioManager {

    private static _audioManager: AudioManager;

    public static getInstance(): AudioManager {
        if (!this._audioManager) {
            this._audioManager = new AudioManager();
        }
        return this._audioManager;
    }

    /**
     * 音效、短音频管理器
     */
    private _shortAudioSource: AudioSource;
    /**
     * 背景音乐、长音频管理器
     */
    private _longAudioSource: AudioSource;

    /**
     * 长音频开关
     */
    private _shortSwitch: boolean;
    /**
     * 短音频开关
     */
    private _LongSwitch: boolean;

    /**
     * 添加场景常驻节点 -shortAudioNode -name-audioShort
     * 短音频管理节点 -longAudioNode -name-audioLong
     * 长音频管理节点
     */
    private constructor() {
        let shortAudioNode = new Node();
        shortAudioNode.name = "audioShort";
        director.getScene().addChild(shortAudioNode);
        director.addPersistRootNode(shortAudioNode);
        this._shortAudioSource = shortAudioNode.addComponent(AudioSource);

        let longAudioNode = new Node();
        longAudioNode.name = "audioLong";
        director.getScene().addChild(longAudioNode);
        director.addPersistRootNode(longAudioNode);
        this._longAudioSource = longAudioNode.addComponent(AudioSource);
    }


    /**
     * 播放短音频、音效
     * @param sound 音频或动态资源地址
     * @param volume 音量
     */
    playShort(sound: AudioClip | string, volume: number = 1.0) {
        if (!this._shortSwitch) {
            return;
        }
        if (sound instanceof AudioClip) {
            this._shortAudioSource.playOneShot(sound, volume);
        } else {
            resources.load(sound, (e, clip: AudioClip) => {
                if (e) {
                    console.log(e);
                    return;
                }
                this._shortAudioSource.playOneShot(clip, volume);
            })
        }
    }

    /**
     * 播放长音频、背景音乐
     * @param sound 音频或动态资源地址
     * @param volume 音量
     */
    playLong(sound: AudioClip | string, volume: number = 1.0) {
        if (!this._LongSwitch) {
            return;
        }
        if (sound instanceof AudioClip) {
            this._longAudioSource.clip = sound;
            this._longAudioSource.play();
            this._longAudioSource.volume = volume;
        }
        else {
            resources.load(sound, (err, clip: AudioClip) => {
                if (err) {
                    console.log(err);
                    return;
                }
                this._longAudioSource.clip = clip;
                this._longAudioSource.play();
                this._longAudioSource.volume = volume;
            });
        }
    }

    /**
     * 设置短音频、音效的音量
     * @param value 音量大小，0~1
     * @returns 
     */
    setShortVolume(value: number) {
        if (value < 0 || value > 1) {
            return;
        }
        this._shortAudioSource.volume = value;
    }

    /**
     * 设置长音频、背景音乐的音量
     * @param value 音量大小，0~1
     * @returns 
     */
    setLongVolume(value: number) {
        if (value < 0 || value > 1) {
            return;
        }
        this._longAudioSource.volume = value;
    }

    /**
     * 设置短音频、音效开关
     * @param value 开关
     */
    setShortSwitch(value: boolean) {
        this._shortSwitch = value;
        if (!value) {
            this.stopShort();
        }
    }

    /**
     * 设置长音频、背景音乐开关
     * @param value 开关
     */
    setLongSwitch(value: boolean) {
        this._LongSwitch = value;
        if (!value) {
            this.stopLong();
        } else {
            this.resumeLong();
        }
    }

    /**
     * 停止播放短音频、音效
     */
    stopShort() {
        this._shortAudioSource.stop();
    }

    /**
     * 停止播放长音频、音效
     */
    stopLong() {
        this._longAudioSource.stop();
    }

    /**
     * 暂停播放短音频、音效
     */
    pauseShort() {
        this._shortAudioSource.pause();
    }

    /**
     * 暂停播放长音频、音效
     */
    pauseLong() {
        this._longAudioSource.pause();
    }

    /**
     * 恢复播放短音频、音效
     */
    resumeShort() {
        if (!this._shortSwitch) {
            return;
        }
        this._shortAudioSource.play();
    }

    /**
     * 恢复播放长音频、音效
     */
    resumeLong() {
        if (!this._LongSwitch) {
            return;
        }
        this._longAudioSource.play();
    }


}


