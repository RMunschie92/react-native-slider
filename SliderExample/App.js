/* @flow */
import React, {useState} from "react";
import {Image, SafeAreaView, ScrollView, Text, View} from "react-native";
import {Slider} from "../src/Slider";

// constants
const thumbImage = require("./img/thumb.png");

// styles
import {
    componentThumbStyles,
    customStyles,
    customStyles2,
    customStyles3,
    customStyles4,
    customStyles5,
    customStyles6,
    customStyles7,
    customStyles8,
    customStyles9,
    iosStyles,
    styles,
} from "./styles";

const DEFAULT_VALUE = 0.2;
const DURATION = 300;

const CustomThumb = () => (
    <View style={componentThumbStyles.container}>
        <Text>Any</Text>
    </View>
);

const AboveThumb = () => (
    <View style={{backgroundColor: "grey", height: 40, width: 100}}>
        <Image source={thumbImage} />
    </View>
);

class App extends React.Component<*, *> {
    state = {
        currentTime: 0,
        scrubbing: false,
        scrubbingValue: 0,
    };

    componentDidMount() {
        this.interval = setInterval(() => {
            this.setState(prevState => ({
                currentTime: prevState.currentTime + 0.5,
            }));
        }, 500);
        setTimeout(() => {
            clearInterval(this.interval);
        }, DURATION * 1000 + 500);
    }

    onSlidingStart = () => {
        requestAnimationFrame(() => {
            this.setState(() => ({
                scrubbing: true,
                scrubbingValue: this.props.currentTime,
            }));
        });
    };

    onValueChange = (scrubbingValue: number) =>
        requestAnimationFrame(() => {
            this.setState(() => ({
                scrubbingValue,
            }));
        });

    onSlidingComplete = (value: number) => {
        requestAnimationFrame(() => {
            this.setState((prevState: *) => {
                return {
                    currentTime: value,
                    scrubbing: false,
                };
            });
        });
    };

    interval: *;

    render() {
        const {currentTime, scrubbing, scrubbingValue} = this.state;
        const value = scrubbing ? scrubbingValue : currentTime;
        return (
            <SafeAreaView style={styles.container}>
                <Slider
                    animateTransition
                    trackClickable
                    value={value}
                    maximumValue={DURATION}
                    maximumTrackTintColor="grey"
                    minimumTrackTintColor="blue"
                    onSlidingComplete={this.onSlidingComplete}
                    onSlidingStart={this.onSlidingStart}
                    onValueChange={this.onValueChange}
                    renderAboveThumbComponent={AboveThumb}
                />
                <Slider
                    animateTransition
                    maximumValue={DURATION}
                    renderThumbComponent={CustomThumb}
                    trackStyle={customStyles.track}
                    value={value}
                />
            </SafeAreaView>
        );
    }
}

// const SliderContainer = (props: {caption: string, children: React.node}) => {
//     const {caption} = props;
//     const [value, setValue] = useState(DEFAULT_VALUE);

//     const renderChildren = () => {
//         return React.Children.map(props.children, child => {
//             if (!!child && child.type === Slider) {
//                 return React.cloneElement(child, {
//                     value,
//                     onValueChange: val => setValue(val),
//                 });
//             }
//             return child;
//         });
//     };

//     return (
//         <View>
//             <View style={styles.titleContainer}>
//                 <Text>{caption}</Text>
//                 <Text>{value}</Text>
//             </View>
//             {renderChildren()}
//         </View>
//     );
// };

// const App = () => (
//     <SafeAreaView>
//         <ScrollView contentContainerStyle={styles.container}>
//             <SliderContainer caption="<Slider/> with default style">
//                 <Slider />
//             </SliderContainer>
//             <SliderContainer caption="<Slider/> with custom thumb component">
//                 <Slider
//                     animateTransition
//                     renderThumbComponent={CustomThumb}
//                     trackStyle={customStyles.track}
//                 />
//             </SliderContainer>
//             <SliderContainer caption="<Slider/> with min, max and custom tints">
//                 <Slider
//                     animateTransition
//                     maximumTrackTintColor="#d3d3d3"
//                     maximumValue={42}
//                     minimumTrackTintColor="#1fb28a"
//                     minimumValue={-10}
//                     thumbTintColor="#1a9274"
//                 />
//             </SliderContainer>
//             <SliderContainer caption="<Slider/> with custom style">
//                 <Slider
//                     animateTransition
//                     maximumTrackTintColor="#b7b7b7"
//                     minimumTrackTintColor="#1073ff"
//                     thumbStyle={iosStyles.thumb}
//                     trackStyle={iosStyles.track}
//                 />
//             </SliderContainer>
//             <SliderContainer caption="<Slider/> with custom style #2">
//                 <Slider
//                     animateTransition
//                     minimumTrackTintColor="#30a935"
//                     thumbStyle={customStyles2.thumb}
//                     trackStyle={customStyles2.track}
//                 />
//             </SliderContainer>
//             <SliderContainer caption="<Slider/> with custom style #3">
//                 <Slider
//                     animateTransition
//                     minimumTrackTintColor="#eecba8"
//                     thumbStyle={customStyles3.thumb}
//                     trackStyle={customStyles3.track}
//                 />
//             </SliderContainer>
//             <SliderContainer caption="<Slider/> with custom style #4">
//                 <Slider
//                     animateTransition
//                     minimumTrackTintColor="#d14ba6"
//                     thumbStyle={customStyles4.thumb}
//                     trackStyle={customStyles4.track}
//                 />
//             </SliderContainer>
//             <SliderContainer caption="<Slider/> with custom style #5">
//                 <Slider
//                     animateTransition
//                     minimumTrackTintColor="#ec4c46"
//                     thumbStyle={customStyles5.thumb}
//                     trackStyle={customStyles5.track}
//                 />
//             </SliderContainer>
//             <SliderContainer caption="<Slider/> with custom style #6">
//                 <Slider
//                     animateTransition
//                     minimumTrackTintColor="#e6a954"
//                     thumbStyle={customStyles6.thumb}
//                     trackStyle={customStyles6.track}
//                 />
//             </SliderContainer>
//             <SliderContainer caption="<Slider/> with custom style #7">
//                 <Slider
//                     animateTransition
//                     minimumTrackTintColor="#2f2f2f"
//                     thumbStyle={customStyles7.thumb}
//                     trackStyle={customStyles7.track}
//                 />
//             </SliderContainer>
//             <SliderContainer caption="<Slider/> with custom style #8 and thumbTouchSize">
//                 <Slider
//                     animateTransition
//                     conatinerStyle={customStyles8.container}
//                     minimumTrackTintColor="#31a4db"
//                     thumbStyle={customStyles8.thumb}
//                     thumbTouchSize={{width: 50, height: 40}}
//                     trackStyle={customStyles8.track}
//                 />
//             </SliderContainer>
//             <SliderContainer caption="<Slider/> with custom style #9 and thumbImage">
//                 <Slider
//                     animateTransition
//                     minimumTrackTintColor="#13a9d6"
//                     thumbImage={thumbImage}
//                     thumbStyle={customStyles9.thumb}
//                     thumbTintColor="#0c6692"
//                 />
//             </SliderContainer>
//         </ScrollView>
//     </SafeAreaView>
// );

export default App;
