import { ToneAudioNodeOptions } from "../core/context/ToneAudioNode";
import { SignalOperator } from "./SignalOperator";
import { WaveShaper } from "./WaveShaper";

/**
 *  Return the absolute value of an incoming signal.
 *
 *  @example
 * var signal = new Tone.Signal(-1);
 * var abs = new Tone.Abs();
 * signal.connect(abs);
 * //the output of abs is 1.
 */
export class Abs extends SignalOperator<ToneAudioNodeOptions> {

	name = "Abs";

	/**
	 * The node which converts the audio ranges
	 */
	private _abs = new WaveShaper({
		context: this.context,
		mapping: val => {
			if (Math.abs(val) < 0.001) {
				return 0;
			} else {
				return Math.abs(val);
			}
		},
	});
	protected _internalChannels = [this._abs];

	/**
	 * The AudioRange input [-1, 1]
	 */
	input = this._abs;

	/**
	 * The output range [0, 1]
	 */
	output = this._abs;

	/**
	 *  clean up
	 */
	dispose(): this {
		super.dispose();
		this._abs.dispose();
		return this;
	}
}